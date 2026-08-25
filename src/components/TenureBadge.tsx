export default function TenureBadge({ termCount }: { termCount: number }) {
  const isFirstTerm = termCount <= 1;
  return (
    <span className={`tenure-badge ${isFirstTerm ? "tenure-new" : "tenure-veteran"}`}>
      {isFirstTerm ? "כהונה ראשונה" : `כהונה מס' ${termCount}`}
    </span>
  );
}
