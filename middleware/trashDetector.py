import sys

import torch
import torch.nn as nn
from PIL import Image
from torchvision import transforms
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights


def build_model():
    weights = EfficientNet_B0_Weights.IMAGENET1K_V1
    model = efficientnet_b0(weights=weights)
    in_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(in_features, 1)  # single logit
    return model


_preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=(0.485, 0.456, 0.406),
                         std=(0.229, 0.224, 0.225)),
])


def load(weights_path="middleware/weights_efficientnet_b0.pt", device=None):
    if device is None:
        device = "cuda" if torch.cuda.is_available() else "cpu"
    model = build_model()
    model.load_state_dict(torch.load(weights_path, map_location=device))
    model.eval().to(device)
    return model, device


@torch.inference_mode()
def predict_image(model, device, image_path, threshold=0.5):
    img = Image.open(image_path).convert("RGB")
    x = _preprocess(img).unsqueeze(0).to(device)

    logit = model(x).squeeze()
    p_pos = torch.sigmoid(logit).item()  # probability of class index 1
    reliability = abs(p_pos - 0.5) * 2.0

    # IMPORTANT: map class index 1 correctly based on your ImageFolder class_to_idx
    # If classes are ['organic','recyclable'] then class 1 = recyclable:
    label = "recyclable" if p_pos >= threshold else "organic"

    return {
        "label": label,
        "p_recyclable": p_pos,
        "reliability": reliability,
    }


model, device = load()
print(predict_image(model, device, image_path=sys.argv[1]))



#sys.stdout.flush()
