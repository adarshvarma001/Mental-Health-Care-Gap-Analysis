def map_class_to_severity(cls: int):
    if cls <= 1:
        return "Low"
    elif cls <= 3:
        return "Moderate"
    else:
        return "High"