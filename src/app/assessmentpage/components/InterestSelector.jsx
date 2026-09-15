const interests = [
  "Software Development",
  "Artificial Intelligence",
  "Data Science",
  "Cyber Security",
  "Cloud Computing",
  "Design & Creativity",
  "Business",
  "Finance",
  "Marketing",
  "Research",
  "Teaching",
  "Entrepreneurship",
  "Product Management",
  "Technology",
  "Problem Solving",
];

export default function InterestSelector({
  selectedInterests = [],
  setSelectedInterests = () => { },
}) {
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter(
          (item) => item !== interest
        )
      );
    } else {
      setSelectedInterests([
        ...selectedInterests,
        interest,
      ]);
    }
  };

  return (
    <div>
      <p className="mb-4 text-xs text-slate-500">
        Select the areas you are interested in.
      </p>

      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => {
          const selected =
            selectedInterests.includes(interest);

          return (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition ${selected
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white"
                }`}
            >
              {interest}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-xs text-slate-600">
        {selectedInterests.length} interests selected
      </p>
    </div>
  );
}