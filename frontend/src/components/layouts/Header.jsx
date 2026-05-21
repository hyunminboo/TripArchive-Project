import React, { useMemo } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const QUOTES = [
  "The world is a book, and those who do not travel read only one page.",
  "Travel is the only thing you buy that makes you richer.",
  "Life is short and the world is wide.",
  "To travel is to live.",
  "Not all those who wander are lost.",
];

const Header = () => {
  const quote = useMemo(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
    []
  );

  return (
    <header className="main-header">
      <div className="inner">

        <p className="header-quote">&ldquo;{quote}&rdquo;</p>
        <div className="header-spacer" />
        <div className="header-actions">
          <Link to="/app/posts/new" className="header-new-btn">
            새 메모 작성
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
