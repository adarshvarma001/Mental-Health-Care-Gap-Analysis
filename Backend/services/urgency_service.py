def compute_urgency(risk_score, labels):
    """
    risk_score: int or float (0–100)
    labels: {
        "Anxiety": {"score": x},
        "Stress": {"score": x},
        "Depression": {"score": x},
        "Sleep": {"score": x}
    }
    """

    R = risk_score / 100
    A = labels["Anxiety"]["score"] / 100
    S = labels["Stress"]["score"] / 100
    D = labels["Depression"]["score"] / 100
    SL = labels["Sleep"]["score"] / 100

    # Mental Severity Index (MSI)
    MSI = (
        0.25 * D +
        0.25 * SL +
        0.20 * S +
        0.15 * A
    )

    urgency = (0.45 * R) + (0.55 * MSI)
    urgency_pct = round(urgency * 100, 2)

    # Safety overrides
    if labels["Depression"]["score"] >= 70 or labels["Sleep"]["score"] >= 80:
        urgency_pct = max(urgency_pct, 70)

    if risk_score >= 75 and MSI >= 0.6:
        urgency_pct = max(urgency_pct, 80)

    return urgency_pct


def urgency_level(score):
    """
    Converts urgency percentage into label
    """

    if score < 30:
        return "Low"
    elif score < 60:
        return "Moderate"
    elif score < 80:
        return "High"
    else:
        return "Critical"
