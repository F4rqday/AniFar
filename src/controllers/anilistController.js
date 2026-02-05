const {anilistRequest} = require('../services/anilist')

exports.searchAnime = async (req, res, next) => {
    try{
        const q = req.query.query;
        if(!q) return res.status(400).json({message:"parameter query is required"});
        
        const query = `
        query ($search: String) {
            Page(perPage: 10) {
                media(search: $search, type: ANIME) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    episodes
                    format
                    averageScore
                    coverImage {large}
                    siteUrl
                }
            }
        }`;

        const data = await anilistRequest(query, {search:q})
        res.json({result: data.Page.media});

    } catch (e){
        //share this error with global error handler
        next(e);
    }

};

exports.getAnimeById = async (req, res, next) => {
    try{
        const id = Number(req.params.id);
        if(!id) return res.status(400).json({message:"id must be a number"});

        const query = `
        query ($id: Int) {
            Media(id: $id, type: ANIME) {
            id
            title { romaji english native }
            description(asHtml: false)
            episodes
            status
            averageScore
            genres
            coverImage { large }
            siteUrl
            }
        }
        `;

        const data = await anilistRequest(query, {id});
        res.json({anime: data.Media});
   
    } catch (e){ next(e); } //share this error with global error handler

};

