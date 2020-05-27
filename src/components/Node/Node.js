import React from 'react';
import './Node.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder, faChevronDown} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const collection = [
    {
        id: 'project-id-1',
        title: 'EIP-SERVER-API',
        url: '',
        date: Date('2019-04-17T03:24:00'),
        description: 'This is an API server created with node and express. It handles user registration and user profiles for a web application',
        screenshots: 'https://d2ijz6o5xay1xq.cloudfront.net/account_1944/postman-screen_c19b98186c029cbac20ae221fb1f3392_800.png',
        code: [{
            name: 'index.js', type: 'file', id: 'file-id', content: <pre>{`const express = require('express');
        const mongoose = require('mongoose');
        const bodyParser = require('body-parser');
        const jsonwebtoken = require('jsonwebtoken');
        const routes = require('./src/routes/registrationRoutes');
        const Socket = require('./src/routes/socketPrivateMessages');
        const dotenv = require('dotenv');
        const cors = require('cors');
        const app = express();
        const PORT = process.env.PORT || 3001;
        const http = require('http').createServer(app);
        const io = require('socket.io')(http);
        
        // environment variables configuration
        dotenv.config();
        
        // mongoose connection
        try {
            mongoose.Promise = global.Promise;
            mongoose.connect(process.env.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
                .then(() =&gt; console.log(\`connected to DataBase successfully! at \${Date(Date.now().toString())}\`))
                .catch(err =&gt; console.log(\`Could not connect to DataBase: \${err}\`));
        } catch (error) {
            console.log(error)
        }
        
        /**
         * Middleware
         */
        // bodyparser setup
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        // cors setup
        app.use(cors({ origin: '*' }));
        
        // JWT setup
        app.use((req, res, next) =&gt; {
            if (req.headers &amp;&amp; req.headers.authorization &amp;&amp; req.headers.authorization.split(' ')[0] === 'JWT') {
                jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.APP_KEY, (err, decode) =&gt; {
                    if (err) req.user = undefined;
                    req.user = decode;
                    next();
                });
            } else {
                req.user = undefined;
                next();
            }
        });
        // handle socket calls
        Socket(io);
        // handle http routes
        routes(app);
        
        // serve static files
        app.use(express.static('public'));
        
        app.get('/', (req, res) =&gt;
            res.send(\`futureDocumentation.html\`)
        );
        
        http.listen(PORT, () =&gt;
            console.log(\`your server is running on port \${PORT}\`)
        );`}

            </pre>
        }, {
            name: 'routes', type: 'dir', id: 'file-id-2', content:
                [{
                    name: 'internalFile', type: 'file', id: 'file-id-3', parentId: 'file-id-2'
                }]
        }]
    }
];
const Node = () => {
    const toggleClasses = (parentId)=>{
    const internalFiles = document.querySelector('.internal-files');
    const iconToTurn = document.querySelector('.icon-to-turn');
   if(internalFiles.classList.contains(parentId)) internalFiles.classList.toggle('folder-opened')
   if(iconToTurn.classList.contains(parentId)) iconToTurn.classList.toggle('turn-downwards')
   }
    return (<>
        <main className='node-main light main'>
            <h1 className='main-title primary--text title-font'>My Node Projects</h1>

            {collection.map((project) => {
                return (<article className='project-container light' key={project.id}>
                    <h1 className='project-title primary--text title-font'>Title: {project.title}</h1>
                    <p><span className='primary--text bold'>Description:</span> {project.description}</p>
                    <a target='_blank' href={project.screenshots} className='screenshot-container'>
                        <picture >
                            <source media="(min-width:650px)" srcSet={project.screenshots} />
                            <source media="(min-width:465px)" srcSet={project.screenshots} />
                            <img className='project-screenshot' src={project.screenshots} alt={`${project.title}-view`} />
                        </picture>
                    </a>
                    <div className='file-container'>
                        <span className='bold'>Files</span>
                        {project.code.map(file => (file.type === 'file')
                            ? <Link to={`/node/file/${file.id}`} key={file.id}>
                                <button className='file-button'> <FontAwesomeIcon icon={faFile} className='primary--text'/>  {file.name}</button>
                            </Link>
                            : <div key={file.id}>
                                <button onClick={() => toggleClasses(file.id)} className='file-button'>
                                <FontAwesomeIcon icon={faChevronDown} className={`${file.id} primary--text icon-to-turn`}/> <FontAwesomeIcon icon={faFolder} className='secondary--text'/>  {file.name}
                                </button>
                                {file.content.map(childFile => <Link
                                    className={`${file.id} internal-files`}
                                    to={`/node/file/${childFile.id}`}
                                    key={childFile.id}>
                                    <button className='file-button '> <FontAwesomeIcon icon={faFile} className='primary--text'/>  {childFile.name}
                                    </button>
                                </Link>)
                                }
                            </div>
                        )}
                    </div>
                </article>)
            })}
        </main>
    </>)
}

export default Node