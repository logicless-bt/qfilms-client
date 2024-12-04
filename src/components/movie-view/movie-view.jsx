export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src = {movie.img} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{movie.director}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};