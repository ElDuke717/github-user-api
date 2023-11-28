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

  async function fetchData(username: string, e: unknown) {
    e.preventDefault();

    const response = await fetch(`https://api.github.com/users/${username}`);
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      setData(data);
    } else {
      console.log("Error: User not found");
    }
  }
  return (
    <>
      <div>
        <p className="font-bold text-center pt-10">The Search Form</p>
      </div>
      <Form fetchData={fetchData}/>
      {data && <Card data={data}/>}
    </>
  );
}
export default App;
