const InfoCard = ({ title, children }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="text-sm">{children}</div>
  </div>
);

export default InfoCard ;