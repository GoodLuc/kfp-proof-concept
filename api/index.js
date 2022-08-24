import express from "express";
import cors from "cors";
const router = express.Router();
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://ombu_test:rEUILx9yF9fyG5k9@ombu-cluster1-3qjol.mongodb.net/test?retryWrites=true&w=majority");
client.connect();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

//// New permit request ////
router.post("/apply", async (req, res) => {
  console.log("req is", req.body);
  req.body.application.email = req.body.application.email.toLowerCase();

  try {
    const applications = client.db("Ombu_test1").collection("PermitRequests");
    await applications.insertOne({
      email: req.body.application.email,
      requestedStreet: req.body.application.street,
      timeOfDay: req.body.application.timeOfDay,
    });
    res.status(201).send();
  } catch (e) {
    console.log("Error", e.message);
    res.status(503).send();
  }
});

//// Get all permit requests ////
router.get("/submissions", async (req, res) => {
  try {
    const applications = client.db("Ombu_test1").collection("PermitRequests");
    const allRequests = await applications.find({}).toArray();
    console.log("sending", allRequests);
    res.status(200).send(allRequests);
  } catch (e) {
    console.log("Error", e.message);
    res.status(503).send();
  }
});

// Routes
app.use("/api/permits", router);

process.env.NODE_ENV = "dev";

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  //app.use(express.static(__dirname + '/'))

  // Handle SPA
  //app.get('/', (req, res) => res.sendFile(__dirname + '/client/dist/index.html'))
  //app.get('/server/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

  //app.use('/', express.static(__dirname + '/client/dist/'));
  app.use("/", express.static(__dirname + "/public/"));
}

app.listen(port, () => console.log(`Server started on port ${port}`));
