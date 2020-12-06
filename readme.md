# Popcorn v1.0

Pop info of movies/tv series and corn them around

## What are we trying to do
- Dump of imdb basics data
- If movie not found in database
    - Crawl from yts first
    - Then crawl imdb
- Get complete data of movie
- Also open youtube trailer for that movie
    - If we have that movie in local system then give option to play that movie
    - Else give option to download torrent for that movie
- If frontend provides list of movies then get following data for those movies
    - Image
    - Name
    - Rating
    - Genre
    - Short Description
- Show top movies
- Use https://developers.themoviedb.org/

## Further
- Do same thing for tv series
- Use solr
    
## Databases
- Movie
    - Image
    - Language
    - Name
    - Genre Id
- Movie Rating
    - Movie Id
    - Rating
- Genre
    - Name
- User
    - Name
    - Username
    - Password
    - Country
    - Email
    - Phone
    - Image
    - Preferred Genre Id
    - Movie Collection
    - Movie Wishlist
    - Movie Watched
    
## Dependent services
- guessit website in python (if guessit-wrapper for node doesn't work)
- node wrapper for search torrent
- youtube trailer display
- cron job to get imdb ratings