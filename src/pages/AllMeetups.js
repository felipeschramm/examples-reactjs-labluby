import MeetupList from "../meetups/MeetupList";
import { useEffect, useState } from "react";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    var url = "https://react-http-a431c-default-rtdb.firebaseio.com/";

    fetch(url + "meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const allMeetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          allMeetups.push(meetup);
        }

        setIsLoading(false);
        setMeetups(allMeetups);
      });
  }, []);

  if (isLoading) {
    return <p>Loanding...</p>;
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={meetups} />
    </section>
  );
}

export default AllMeetupsPage;
