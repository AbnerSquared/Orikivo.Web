window.onload = function()
{
    var _navBar = document.getElementById("nav-bar");
    document.getElementById("nav-toggle").onclick = function()
    {
        if (_navBar.style.display == 'inline-block')
        {
            _navBar.style.display = 'none';
        }
        else
        {
            _navBar.style.display = 'inline-block';
        }
    };
}