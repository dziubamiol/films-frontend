import { FileReceiveEvent } from '../components/DragnDrop';

export interface IFilmRaw {
    name?: string;
    releaseYear?: number;
    actors?: Array<string>;
    format?: string;
}

const readingSequence = ['title', 'release', 'format', 'actor'];

export class FileParserError extends Error {
}

const fileParser = async (event: FileReceiveEvent, submit: (error: FileParserError | null, parsedFilms: Array<IFilmRaw>) => void) => {
    if (event.file !== null) {
        const reader = new FileReader();
        const parsedFilms: Array<IFilmRaw> = [];

        reader.onload = async (event: ProgressEvent<FileReader>) => {
            const text = event.target && event.target.result;
            let textString = text + '';

            const lines = textString.split('\n');

            let lineCount = 0;

            const re = new RegExp('\r', 'g');

            let parsedFilm: IFilmRaw = {};
            let currentSequence = ['title', 'release', 'format', 'actors'];
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                /* remove all non alpha symbols */

                /* push film to films if reading was finished, reset currentSequence */
                if (line.length < 4 && currentSequence.length === 0) {
                    parsedFilms.push(parsedFilm);
                    parsedFilm = {};
                    currentSequence = ([] as Array<string>).concat(readingSequence);
                }

                /* skip empty rows and error if film is not finished */
                if (line.length < 4 && currentSequence.length > 0 && currentSequence.length !== 4)
                    submit(new FileParserError(`Corrupted file, missing ${currentSequence} at line ${lineCount}`), parsedFilms);
                else if (line.length < 4 && currentSequence.length === 4) {
                    continue;
                }

                /* parsing process */
                if (line.includes('Title')) {
                    parsedFilm.name = line.replace('Title: ', '').replace(re, '');
                    currentSequence.splice(currentSequence.indexOf('title'), 1);
                } else if (line.includes('Release')) {
                    const releaseYearString = line.replace('Release Year: ', '').replace(re, '');
                    const releaseYear = parseInt(releaseYearString);
                    if (!isNaN(releaseYear)) {
                        parsedFilm.releaseYear = releaseYear;
                        currentSequence.splice(currentSequence.indexOf('release'), 1);
                    } else {
                        submit(new FileParserError(`Corrupted file, year is NaN from ${releaseYearString} at line ${lineCount}`), parsedFilms);
                    }
                } else if (line.includes('Format:')) {
                    parsedFilm.format = line.replace('Format: ', '').replace(re, '');
                    currentSequence.splice(currentSequence.indexOf('format'), 1);
                } else if (line.includes('Stars')) {
                    parsedFilm.actors = line.replace('Stars: ', '').split(', ');
                    parsedFilm.actors = parsedFilm.actors.map(el => el.replace(re, ''))
                    currentSequence.splice(currentSequence.indexOf('actors'), 1);
                }
                lineCount++;
            }

            submit(null, parsedFilms);
        }

        reader.readAsText(event.file);
    }

}


export default fileParser;
