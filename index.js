const express = require('express');
const app = express();
let port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Diksha Arora",
        content: "I love Coding"
    },
    {
        id: uuidv4(),
        username: "Shardha Kapra",
        content: "I got my first internship"
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");  // By default GET request
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    // console.log(post);
//     res.send("Patch Request working");
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    // console.log( id);
    // console.log(posts);
   
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id",(req,res)=>
{
    let { id } = req.params;
     posts = posts.filter((p) => id !== p.id);
    // res.send("DELETE SUCCESS");
    res.redirect("/posts");


});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});