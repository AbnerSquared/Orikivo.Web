// sections/commands.html compiler
var ClassTags = {
    Module: "module",
    Command: "command",
    Arg: "arg"
};

class Module
{
    constructor(name, flavorText, summary, commands, submodules = null)
    {
        this.name = name; // name of module.
        this.flavorText = flavorText;
        this.summary = summary;
        this.submodules = submodules;
        this.commands = commands;
        // submodules
    }
    

    build()
    {
        var _div = createDiv(null, ClassTags.Module);
        var pointer = createDiv(this.name, "module-pointer"); // this is what scrolls into view.

        var moduleInfo = createDiv(null, "module-info");

        var moduleCommands = createDiv(`${this.name}-commands-list`, "module-commands");
        var moduleData = createDiv(null, "module-data");

        var moduleHeader = createDiv(null, "module-header");
        moduleHeader.appendChild(createDiv("title", null, this.name));
        moduleHeader.appendChild(createDiv("flair", null, this.name));
        moduleHeader.onclick = function() { toggleElement(moduleCommands); };

        var moduleSummary = createDiv(null, "module-summary");
        moduleSummary.innerText = this.summary;

        moduleInfo.appendChild(moduleHeader);

        var _module = this;
        this.commands.forEach(function(command)
        {
            var commandInfo = command.build();
            commandInfo.id = `${_module.name}-${command.name}`;
            var commandBox = command.read();
            commandBox.onclick = function() { scrollToElement(commandInfo.id); }; 

            moduleCommands.appendChild(commandBox);
            moduleData.appendChild(commandInfo);
        });

        moduleInfo.appendChild(moduleCommands);
        moduleInfo.appendChild(moduleSummary);

        _div.appendChild(pointer);
        _div.appendChild(moduleInfo);
        _div.appendChild(moduleData);

        return _div;
    }
}

class Command
{
    // to-do: Add overload support
    constructor(name, summary, aliases = null, args = null)
    {
        this.name = name;
        this.summary = summary;
        this.aliases = aliases;
        this.args = args;
    }

    read()
    {
        return createDiv(null, "module-command", this.name);
    }

    // build() = read the entire set information dedicated to an argument
    // list() = read the arg as a block info.

    build()
    {
        var _border = createDiv(null, "command-info-border");
        var _div = createDiv(null, "command-info");
        var commandSyntax = createDiv(null, "command-syntax");

        var commandName = createSpan("command-name");
        commandName.innerHTML = htmlBold(this.name);

        var commandParameterData = createDiv(null, "command-param-data");

        if (this.args != null)
        {
            var commandParameters = document.createElement("span");
            commandParameters.className = "command-parameters";

            var argOpener = document.createElement("span");
            argOpener.innerText = "(";

            var argCloser = document.createElement("span");
            argCloser.innerText = ")";

            commandParameters.appendChild(argOpener);

            this.args.forEach(function(arg)
            {
                var argInfo = arg.build();
                var argParam = arg.list();
                argParam.onclick = function() { toggleElement(argInfo); };

                commandParameterData.appendChild(argInfo);
                commandParameters.appendChild(argParam);
            });

            commandParameters.appendChild(argCloser);
            commandSyntax.appendChild(commandParameterData);
            commandSyntax.appendChild(commandName);
            commandSyntax.appendChild(commandParameters);
        }
        else
        {
            commandName.innerHTML += `()`;
            commandSyntax.appendChild(commandName);
        }


        var commandSummary = createDiv(null, "command-summary", this.summary);

        _div.appendChild(commandSyntax);

        if (this.aliases != null)
        {
            var commandAliases = createDiv(null, "command-aliases", `--${this.aliases.toString()}`);
            _div.appendChild(commandAliases);
        }

        _div.appendChild(commandSummary);
    
        _border.appendChild(_div);
        return _border;
    }
}

class Arg
{
    constructor(name, type, summary = null, optional = false)
    {
        this.name = name;
        this.summary = summary;
        this.type = type;
        this.optional = optional;
    }

    build()
    {
        var argInfo = document.createElement("div");
        argInfo.className = "parameter-info";

        var argName = document.createElement("div");
        argName.className = "parameter-name";
        argName.innerText = this.read();
        
        var argType = document.createElement("div");
        argType.className = "parameter-type";
        argType.innerText = this.type;

        var argTypeBubble = document.createElement("span");
        argTypeBubble.className = "parameter-type-bubble";

        // use this upon the bubble being clicked
        //https://docs.microsoft.com/en-us/dotnet/api/system.string

        argInfo.appendChild(argName);
        argInfo.appendChild(argTypeBubble);
        argInfo.appendChild(argType);
        
        if (this.summary != null)
        {
            var argSummary = document.createElement("div");
            argSummary.className = "parameter-summary";
            argSummary.innerText = this.summary;

            argInfo.appendChild(argSummary);
        }

        return argInfo;
    }

    list()
    {
        var parameterInfo = document.createElement("span");
        parameterInfo.className = "command-parameter";
        parameterInfo.innerText = this.read();
        return parameterInfo;
    }

    read()
    {
        var full = this.name;
        if (this.optional)
        {
            full += "?";
        }
        return full;
    }
}

// the actual process starts here.
const modules =
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
        _child.onclick = function() { scrollToElement(_module.name); };

        list.appendChild(_child);
    });
}
