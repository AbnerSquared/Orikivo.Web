// utils module helper
namespace Orikivo.Web {
    export abstract class HtmlFormat
    {
        public static Bold(content: string)
        {
            return `<b>${content}</b>`;
        }
    }

    export function createDiv(id: string = null, className: string = null, innerText: string = null)
    {
        var div = document.createElement("div");
        div.id = id;
        div.className = className;
        if (innerText != null)
            div.innerText = innerText;
        return div;
    }
    
    export function createSpan(className: string = null, innerText: string = null)
    {
        var span = document.createElement("span");
        span.className = className;
        if (innerText != null)
            span.innerText = innerText;
        return span;
    }
    
    export function toggleElement(element: HTMLDivElement)
    {
        if (element.style.display == "none")
            element.style.display = "block";
        else
            element.style.display = "none"; 
    }
    
    export function scrollToElement(id: string)
    {
        document.getElementById(id).scrollIntoView();
    }
    
    var modules =
    [
        new Module("utility", "used to test commands", "dedicated to ensuring simplicity among advanced mechanics",
            new Array(
                new Command("help", "refer to orikivo's documentation on all existing commands.", new Array("h"),
                    new Array(
                    new Arg("context", "string", "search for a command using referrable context.", false)
                    )
                )
            )
        )
    ];

    var main = document.getElementById("side-content");
    var list = document.getElementById("list");
    
    window.onload = function()
    {
        modules.forEach(function(_module)
        {
            // add the module info to the main info box.
            main.appendChild(_module.build());

            // add a module side reference.

            var _child = document.createElement("li");
            _child.innerText = _module.name;
            _child.onclick = function()
            {
                document.getElementById(_module.name).scrollIntoView();
            }

            list.appendChild(_child);
        });
    };
}
