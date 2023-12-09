import "../styles/header.css"

interface HeaderProps{
  username: string;
  rating: number;
}

export default function Header({username, rating}:HeaderProps) {
    return (
        <header>
        <div className="header-wrapper">
          <span className="header-username">{username}</span>
          <span className="header-rating">{rating}</span>
        </div>
      </header>
    );
}