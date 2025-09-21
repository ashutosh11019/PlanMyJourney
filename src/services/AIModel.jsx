import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate travel plan for location: Bangalore, Karnataka, India, for 3 days, for 1 people with a Cheap budget. All in JSON format. Give me best hotel list, at least 5 with name, exact Address, Price, Rating, Description. Suggest itinerary plan as array for each day as list with place name, place details, ticket pricing, rating, time to explore that place and best to visit that place for each of the location for 3 days. "},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"location\": \"Bangalore, Karnataka, India\",\n  \"duration\": \"3 Days\",\n  \"travelers\": 1,\n  \"budget\": \"Cheap\",\n  \"hotels\": [\n    {\n      \"name\": \"Zostel Bangalore\",\n      \"address\": \"12, St. Marks Road, Bangalore, Karnataka 560001, India\",\n      \"price\": \"₹600-₹1200 per night (approx)\",\n      \"rating\": 4.0,\n      \"description\": \"A popular hostel with private rooms and dorm options. Good for solo travelers looking for a social atmosphere.\"\n    },\n    {\n      \"name\": \"Treebo Trend Sterling\",\n      \"address\": \"No. 25/1, 1st Main Road, 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038, India\",\n      \"price\": \"₹800-₹1500 per night (approx)\",\n      \"rating\": 3.8,\n      \"description\": \"A budget-friendly hotel chain offering clean and comfortable rooms.\"\n    },\n    {\n      \"name\": \"FabHotel Parkway\",\n      \"address\": \"6/1, 3rd Main Road, Benson Town, Bengaluru, Karnataka 560046, India\",\n      \"price\": \"₹700-₹1400 per night (approx)\",\n      \"rating\": 3.5,\n      \"description\": \"Another budget hotel option with basic amenities.  Location may require using public transport.\"\n    },\n    {\n      \"name\": \"OYO Rooms\",\n      \"address\": \"Multiple locations across Bangalore (check website for specific locations and prices)\",\n      \"price\": \"₹500-₹1000 per night (approx)\",\n      \"rating\": 3.2,\n      \"description\": \"A large chain with budget options; quality can vary depending on location.  Check reviews carefully.\"\n    },\n    {\n      \"name\": \"Capital O 70049 Hotel President\",\n      \"address\": \"36/1, 100ft Road, Indiranagar, Bengaluru, Karnataka 560038, India\",\n      \"price\": \"₹900-₹1600 per night (approx)\",\n      \"rating\": 3.7,\n      \"description\": \"Budget-friendly hotel in a relatively central location. Check for deals.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"plan\": [\n        {\n          \"place\": \"Cubbon Park\",\n          \"details\": \"Large park with beautiful gardens and historical buildings.\",\n          \"ticket_pricing\": \"Free entry\",\n          \"rating\": 4.5,\n          \"time_to_explore\": \"2-3 hours\",\n          \"best_to_visit\": \"Morning or late afternoon\"\n        },\n        {\n          \"place\": \"Vidhana Soudha\",\n          \"details\": \"Impressive state legislative building; exterior viewing only.\",\n          \"ticket_pricing\": \"Free (exterior)\",\n          \"rating\": 4.2,\n          \"time_to_explore\": \"1 hour\",\n          \"best_to_visit\": \"Morning or afternoon\"\n        },\n        {\n          \"place\": \"Bangalore Palace\",\n          \"details\": \"Tudor-style palace with beautiful architecture and gardens.\",\n          \"ticket_pricing\": \"₹200-₹300 (approx)\",\n          \"rating\": 4.0,\n          \"time_to_explore\": \"2-3 hours\",\n          \"best_to_visit\": \"Afternoon\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"plan\": [\n        {\n          \"place\": \"Tipu Sultan's Summer Palace\",\n          \"details\": \"Historical palace showcasing Tipu Sultan's architectural style.\",\n          \"ticket_pricing\": \"₹50-₹100 (approx)\",\n          \"rating\": 4.0,\n          \"time_to_explore\": \"1-2 hours\",\n          \"best_to_visit\": \"Morning\"\n        },\n        {\n          \"place\": \"Lalbagh Botanical Garden\",\n          \"details\": \"Vast botanical garden with diverse plant species.\",\n          \"ticket_pricing\": \"₹20-₹50 (approx)\",\n          \"rating\": 4.3,\n          \"time_to_explore\": \"2-3 hours\",\n          \"best_to_visit\": \"Morning or late afternoon\"\n        },\n        {\n          \"place\": \"Bull Temple (Dodda Basavana Gudi)\",\n          \"details\": \"Unique temple featuring a large Nandi statue.\",\n          \"ticket_pricing\": \"Free entry\",\n          \"rating\": 4.1,\n          \"time_to_explore\": \"1-2 hours\",\n          \"best_to_visit\": \"Any time\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"plan\": [\n        {\n          \"place\": \"ISKCON Temple\",\n          \"details\": \"Beautiful temple dedicated to Lord Krishna.\",\n          \"ticket_pricing\": \"Free entry\",\n          \"rating\": 4.4,\n          \"time_to_explore\": \"1-2 hours\",\n          \"best_to_visit\": \"Morning or evening\"\n        },\n        {\n          \"place\": \"MG Road & Commercial Street\",\n          \"details\": \"Shopping streets with diverse options, from high street to local markets.\",\n          \"ticket_pricing\": \"Varies depending on purchases\",\n          \"rating\": 4.0,\n          \"time_to_explore\": \"3-4 hours\",\n          \"best_to_visit\": \"Afternoon\"\n        },\n        {\n          \"place\": \"Indiranagar (Explore local cafes and restaurants)\",\n          \"details\": \"Trendy neighbourhood known for its cafes and restaurants.\",\n          \"ticket_pricing\": \"Varies depending on food and drinks\",\n          \"rating\": 4.2,\n          \"time_to_explore\": \"Evening\",\n          \"best_to_visit\": \"Evening\"\n        }\n      ]\n    }\n  ],\n  \"notes\": \"Prices are approximate and may vary. Public transport (buses and metro) are recommended for cheap travel.  Always check the latest ticket prices and opening times before visiting.\"\n}\n```\n"},
        ],
      },
    ],
});

