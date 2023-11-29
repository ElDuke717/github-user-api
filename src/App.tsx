import { useState } from 'react'
import "./App.css";
import Form from "./components/Form";
import Card from './components/Card';

export type GitHubData = {
  name: string;
  avatar_url: string
  login: string
  public_repos: number
  created_at: string
  location: string
  bio: string
  html_url: string
  blog: string
};

function App() {
  const [data, setData] = useState<GitHubData | null>(null);
  // Create a state variable for the cards, which is an array of GitHubData
  const [cards, setCards] = useState<GitHubData[]>([]);

  async function fetchData(username: string, e: unknown) {
    e.preventDefault();

    const response = await fetch(`https://api.github.com/users/${username}`);
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      setData(data);
      setCards([...cards, data]);
    } else {
      console.log("Error: User not found");
    }
  }
  return (
    <>
      <div>
        <img className="rounded-md h-56 mx-auto pt-10" src="/src/assets/banner-img.png" alt="GitHub_User_Banner" />
        <p className="font-bold text-center pt-10">The GitHub User Search</p>
      </div>
      <Form fetchData={fetchData}/>
      <div className='mt-10'>
        {/* Iterate through all the users added to state */}
        {cards.map((card, index) => (
          <Card key={index} data={card} />
        ))}
      </div>
    </>
  );
}
export default App;
