const { Song, Chart } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');

const dataTransfer = song => {
    const { s_title, s_artist, s_tempo, s_version } = song;

    return {
        title: s_title,
        artist: s_artist,
        bpm: s_tempo,
        version: s_version,
        charts: song.Charts.map(chart => {
            const { c_diff, c_level, c_skill, c_notes } = chart;
            return { 
                difficulty: c_diff,
                level: c_level,
                skillpoint: c_skill,
                notes: c_notes
            }
        })
    }
}

exports.getSongs = async ctx => {
    const { limit, offset } = ctx.query;

    const songs = await Song.findAll({
        limit: limit ? limit * 1 : 50,
        offset: offset ? offset * 1 : 0,
        include: Chart,
    }).then(songs => songs.map(song => dataTransfer(song)));

    ctx.body = songs;
}