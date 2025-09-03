
const OldGeneration = () => {
  const oldMemories = [
    "Back in the day, families gathered under the lantern light to share stories late into the night.",
    "Children used to run barefoot in the fields, playing hadudu until the sun went down.",
    "Neighbors often sat together in the courtyard, chatting and laughing like one big family.",
    "Festivals were celebrated with simplicity, yet the joy and bonding were far greater than today.",
    "Afternoons were filled with fun games like marbles, hide-and-seek, and climbing trees.",
    "Grandparents told folk tales and legends that carried wisdom from generation to generation.",
    "Life was slower, but every moment felt warmer with strong community ties.",
    "Evenings were spent singing together, playing traditional instruments, and enjoying togetherness.",
    "People helped each other in farming and shared their harvest with neighbors.",
    "Though there were no gadgets, happiness was found in simple joys and deep friendships."
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Old Generation Memories</h2>
      <ul className="list-disc ml-6 space-y-2">
        {oldMemories.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  )
}

export default OldGeneration;
