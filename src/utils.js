export function diff_minutes(dt2, dt1) {

    var diff = (dt2 - dt1) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}