import torch
import torch.nn as nn
from PIL import Image
from torchvision import transforms
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights
import torch.nn.functional as F
import sys

def build_model():
    weights = EfficientNet_B0_Weights.IMAGENET1K_V1
    model = efficientnet_b0(weights=weights)
    in_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(in_features, 9) 
    return model


_preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=(0.485, 0.456, 0.406),
                         std=(0.229, 0.224, 0.225)),
])


def load(weights_path="middleware/weights_efficientnet_b0_realwaste_9cls.pt", device=None):
    if device is None:
        device = "cuda" if torch.cuda.is_available() else "cpu"
    model = build_model()
    model.load_state_dict(torch.load(weights_path, map_location=device))
    model.eval().to(device)
    return model, device


@torch.inference_mode()
def predict_image(model, device, class_names, image_path, topk=3):
    img = Image.open(image_path).convert("RGB")
    x = _preprocess(img).unsqueeze(0).to(device)

    logits = model(x)                    
    probs = F.softmax(logits, dim=1)     
    probs = probs.squeeze(0)             

    top1_idx = probs.argmax().item()
    top1_label = class_names[top1_idx]
    top1_conf = probs[top1_idx].item()

    topk_probs, topk_indices = probs.topk(topk)
    topk_labels = [
        {"label": class_names[i.item()],
         "prob": topk_probs[j].item()}
        for j, i in enumerate(topk_indices)
    ]

    sorted_probs, _ = probs.sort(descending=True)
    reliability = (sorted_probs[0] - sorted_probs[1]).item()

    return {
        "label": top1_label,
        "confidence": top1_conf,
        "reliability": reliability,
        "topk": topk_labels
    }

class_names = ['Cardboard', 'Food Organics', 'Glass', 'Metal', 'Miscellaneous Trash', 'Paper', 'Plastic', 'Textile Trash', 'Vegetation']
model, device = load()
print(predict_image(model, device, class_names, image_path=sys.argv[1]))



