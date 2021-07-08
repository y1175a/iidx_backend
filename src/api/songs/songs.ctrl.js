const { Songs, Charts } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');

const dataTransfer = song => {
    const { title, artist, bpm, version } = song;
    return {
        title,
        artist,
        bpm,
        version,
        charts: song.Charts.map(chart => {
            const { chart_difficulty, chart_level, chart_skillpoint, notes } = chart;
            return { chart_difficulty, chart_level, chart_skillpoint, notes }
        })
    }
}

exports.getSongs = async ctx => {
    const { limit, offset } = ctx.query;

    const songs = await Songs.findAll({
        limit: limit ? limit : 50,
        offset: offset ? offset : 0,
        include: Charts,
    }).then(songs => songs.map(song => dataTransfer(song)))

    ctx.body = songs;
}