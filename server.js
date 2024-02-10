const express = require('express');
const articleRouter = require('./routes/articles');
const Article = require('./models/article')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@blogmon.hictc7v.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

app.listen(port, ()=>{console.log("Server is listening to port 3000...")});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({ createdAt: 'desc'}); 
    res.render('articles/index', {articles:articles});
})
app.use(express.static(__dirname + '/public'));

app.use('/articles', articleRouter);