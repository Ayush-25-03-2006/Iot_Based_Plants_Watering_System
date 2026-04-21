import "./DetailsPlant.css";
function DetailsPlant() {
        const guideData = [
            {
                topic: "Watering",
                details: "Water the plant when soil moisture is low. Avoid overwatering to prevent root rot.",
                tips: "Check soil with finger or sensor before watering."
            },
            {
                topic: "Sunlight",
                details: "Keep the plant in indirect sunlight for 4–6 hours daily.",
                tips: "Avoid harsh direct sunlight to prevent leaf burn."
            },
            {
                topic: "Soil Quality",
                details: "Use well-drained, nutrient-rich soil for better growth.",
                tips: "Mix compost or organic fertilizer regularly."
            },
            {
                topic: "Temperature",
                details: "Maintain temperature between 20°C to 30°C for optimal growth.",
                tips: "Protect from extreme heat or cold."
            },
            {
                topic: "Humidity",
                details: "Moderate humidity is ideal for most indoor plants.",
                tips: "Spray water occasionally on leaves if air is dry."
            },
            {
                topic: "Fertilization",
                details: "Use fertilizer every 2–3 weeks during growth phase.",
                tips: "Avoid over-fertilizing as it can damage roots."
            },
            {
                topic: "Monitoring",
                details: "Regularly monitor plant health using sensors or visual checks.",
                tips: "Look for yellow leaves or dryness as warning signs."
            }
        ];
  return (
        <div className="guide-container">

            <h2 className="guide-title">🌿 Plant Health & Growth Guide</h2>

            <div className="table-wrapper">
                <table className="guide-table">
                    <thead>
                        <tr>
                            <th>Topic</th>
                            <th>Description</th>
                            <th>Tips</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guideData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.topic}</td>
                                <td>{item.details}</td>
                                <td>{item.tips}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default DetailsPlant;