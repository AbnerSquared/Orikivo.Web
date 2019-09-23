// this manages the basics, like the logo display, etc.
var botId = "433079994164576268"; // Orikivo's Discord Id

function createUriQuery(key, value)
{
    return `${key}=${value}`;
}

function createDblWidget(topColor = null, middleColor = null, usernameColor = null,
    highlightColor = null, labelColor = null, dataColor = null)
    {
        var onClickUrl = `https://discordbots.org/bot/${botId}`;
        var url = new String(`https://discordbots.org/api/widget/${botId}.svg`);
        var query = new Array();
        if (topColor != null)
            query.push(createUriQuery("topcolor", topColor));
        if (middleColor != null)
            query.push(createUriQuery("middlecolor", middleColor));
        if (usernameColor != null)
            query.push(createUriQuery("usernamecolor", usernameColor));
        if (highlightColor != null)
            query.push(createUriQuery("highlightcolor", highlightColor));
        if (labelColor != null)
            query.push(createUriQuery("labelcolor", labelColor));
        if (dataColor != null)
            query.push(createUriQuery("datacolor", dataColor));
        
        if (query.length > 0)
            url = url.concat("?", query.join("&"));

        // creates dbl widget
        var widget = document.getElementById("dbl-widget");
        widget.innerHTML = new String(`<a href="${onClickUrl}"><img class="widget" src=${url.toString()}></a>`);
        return;
    }

function createLogo(name)
{
    var logo = createDiv(null, "logo");
    var title = createDiv("title", null, name);
    var flair = createDiv("flair", null, new String(name).toUpperCase());
    logo.appendChild(title);
    logo.appendChild(flair);
    return logo;
}