// REQUIRED FOR SCRIPTS TO FUNCTION

function htmlBold(content)
{
    return `<b>${content}</b>`;
}

function createDiv(id = null, className = null, innerText = null)
{
    var div = document.createElement("div");
    if (id != null)
        div.id = id;
    if (className != null)
        div.className = className;
    if (innerText != null)
        div.innerText = innerText;
    return div;
}

function createSpan(className = null, innerText = null)
{
    var span = document.createElement("span");
    span.className = className;
    if (innerText != null)
        span.innerText = innerText;
    return span;
}

function createUriQuery(key, value)
{
    return `${key}=${value}`;
}

function createDblWidget(id, topColor = null, middleColor = null, usernameColor = null,
    highlightColor = null, labelColor = null, dataColor = null)
{
    var onClickUrl = `https://discordbots.org/bot/${id}`;
    var url = new String(`https://discordbots.org/api/widget/${id}.svg`);
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
    var a = document.createElement("a");
    a.href = onClickUrl;
    var img = document.createElement("img");
    img.className = "widget";
    img.src = url.toString();
    a.appendChild(img);
    return a;
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

function createCssLink(stylesheet)
{
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    
    var stylesheetPath = new String(stylesheet);
    if (!stylesheetPath.endsWith(".css"))
        stylesheetPath = stylesheetPath.concat(".css");
    link.href = stylesheetPath.toString();
    return link;
}

function toggleElement(element)
{
    if (element.style.display == "none" || element.style.display == null)
        element.style.display = "block";
    else
    {
        element.style.display = "none"; 
    }
}

function scrollToElement(id)
{
    document.getElementById(id).scrollIntoView();
}