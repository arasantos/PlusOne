import { PREFERENCES } from "./preferences.js"

export const events = [
    {
        id: "event1",
        name: "Beach Festival",
        description: "A chill day at the beach with music, food trucks, and games. Good place to hang out and meet new people.",
        image: "assets/images/homepage/image1.png",
        eventDate: "2026-02-23",
        time: "3:00 PM",
        postedByName: "John Doe",
        location: "123 Blvd",
        people: [
            { peopleId: "p1", preference: PREFERENCES.FULL },
            { peopleId: "p2", preference: PREFERENCES.PARTIAL },
            { peopleId: "p3", preference: PREFERENCES.TRANSIT_ONLY },
            { peopleId: "p4", preference: PREFERENCES.FLEXIBLE }],
        isViewed: false
    },

    {
        id: "event2",
        name: "Basketball Tournament",
        description: "Local basketball tournament at the rec center. Come watch some games or join a team if there's space.",
        image: "assets/images/homepage/image2.png",
        eventDate: "2026-02-28",
        time: "5:00 PM",
        postedByName: "Jane Doe",
        location: "234 Blvd",
        people: [],
        isViewed: true
    },

    {
        id: "event3",
        name: "Movie Night",
        description: "We're watching whiplash and just hanging out. Snacks and drinks will be there too.",
        image: "assets/images/homepage/image3.png",
        eventDate: "2026-02-28",
        time: "7:00 PM",
        postedByName: "Sarah Doe",
        location: "345 Blvd",
        people: [],
        isViewed: false
    },

    {
        id: "event4",
        name: "Gaming Tournament",
        description: "Small gaming tournament with a few different games. Mostly just for fun, but there might be prizes.",
        image: "assets/images/homepage/image4.png",
        eventDate: "2026-02-28",
        time: "8:00 PM",
        postedByName: "Marcus Doe",
        location: "456 Blvd",
        people: [],
        isViewed: false
    }
];