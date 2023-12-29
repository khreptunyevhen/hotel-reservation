function InfoBox({ name, value }) {
  return (
    <div className="flex h-28 w-28 flex-col items-center justify-center bg-background p-4">
      <p>{name}</p>
      <span className="text-4xl font-bold">{value}</span>
    </div>
  );
}

export default InfoBox;
