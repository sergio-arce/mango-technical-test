import Link from "next/link"

export default function Home() {
  return (
    <ul className="list">
      <Link href="exercise1" className="listItem link">
        <li className="link">
          Exercise 1
        </li>
      </Link>
      <Link href="exercise2" className="listItem link">
        <li className="link">
          Exercise 2
        </li>
      </Link>
    </ul>
  );
}