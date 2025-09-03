
const GoodNovels = () => {
  const novels = [
    "Pride and Prejudice - Jane Austen",
    "1984 - George Orwell",
    "To Kill a Mockingbird - Harper Lee",
    "The Great Gatsby - F. Scott Fitzgerald",
    "Moby Dick - Herman Melville",
    "War and Peace - Leo Tolstoy",
    "Crime and Punishment - Fyodor Dostoevsky",
    "The Catcher in the Rye - J.D. Salinger",
    "Jane Eyre - Charlotte Brontë",
    "Wuthering Heights - Emily Brontë",
    "Brave New World - Aldous Huxley",
    "The Hobbit - J.R.R. Tolkien",
    "Anna Karenina - Leo Tolstoy",
    "The Odyssey - Homer",
    "The Iliad - Homer",
    "Les Misérables - Victor Hugo",
    "Great Expectations - Charles Dickens",
    "The Kite Runner - Khaled Hosseini",
    "Life of Pi - Yann Martel",
    "The Book Thief - Markus Zusak",
    "Dracula - Bram Stoker",
    "Frankenstein - Mary Shelley",
    "The Alchemist - Paulo Coelho",
    "Harry Potter and the Sorcerer's Stone - J.K. Rowling",
    "The Lord of the Rings: The Fellowship of the Ring - J.R.R. Tolkien"
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Good Novels</h2>
      <ul className="list-disc pl-5 space-y-1 ml-5 mt-3">
        {novels.map((novel, index) => (
          <li key={index}>{novel}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoodNovels;
