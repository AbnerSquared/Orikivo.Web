
// site manager

// colors
origreen =
{
    c1: "rgb(110, 250, 200)",
    c2: "rgb(96, 226, 185)",
    c3: "rgb(82, 202, 170)",
    c4: "rgb(68, 178, 155)",
    c5: "rgb(54, 154, 140)",
    c6: "rgb(40, 130, 125)",
    c7: "rgb(26, 106, 110)",
    c8: "rgb(12, 82, 95)"
};
var main = document.getElementById("side-content");
var list = document.getElementById("list");
var child = document.createElement("li");
var div = document.createElement("div");
//div.className = "module";

// find a way to transfer all of the c# code to a .json
// and then read that .json to show the new modules?

class module
{
    constructor(name, flavorText, summary, commands, submodules = null)
    {
        this.name = name; // name of module.
        this.flavorText = flavorText;
        this.summary = summary;
        this.submodules = submodules;
        this.commands = commands;
        // submodules
        // commands exposed on this module.
    }

    build()
    {
        var _div = document.createElement("div");
        _div.className = "module";

        var pointer = document.createElement('div');
        pointer.className = "module-pointer";
        pointer.id = this.name;

        var title = document.createElement("div");
        title.id = "title";
        title.innerText = this.name;

        var flair = document.createElement("div");
        flair.id = "flair";
        flair.innerText = this.name;

        var moduleInfo = document.createElement("div");
        moduleInfo.className = "module-info";

        var moduleCommands = document.createElement("div");
        moduleCommands.className = "module-commands";
        moduleCommands.id = `${this.name}-commands-list`;
        
        var moduleData = document.createElement("div");
        moduleData.className = "module-data";

        var moduleHeader = document.createElement("div");
        moduleHeader.className = "module-header";
        moduleHeader.appendChild(title);
        moduleHeader.appendChild(flair);
        var _displayOn = "block";
        var _displayOff = "none";
        moduleHeader.onclick = function()
        {
            if(moduleCommands.style.display == _displayOff)
            {
                moduleCommands.style.display = _displayOn;
            }
            else
            {
                moduleCommands.style.display = _displayOff;
            }
        };

        var moduleSummary = document.createElement("div");
        moduleSummary.className = "module-summary";
        moduleSummary.innerText = this.summary;

        moduleInfo.appendChild(moduleHeader);

        var _module = this;
        this.commands.forEach(function(command)
        {
            var _commandId = `${_module.name}-${command.name}`;
            var commandInfo = command.build();
            commandInfo.id = _commandId;
            var commandBox = command.read();
            commandBox.onclick = function() { document.getElementById(_commandId).scrollIntoView(); }; 

            moduleCommands.appendChild(commandBox);
            moduleData.appendChild(commandInfo);
        });

        moduleInfo.appendChild(moduleCommands);

        moduleInfo.appendChild(moduleSummary);

        _div.appendChild(pointer);
        _div.appendChild(moduleInfo);
        _div.appendChild(moduleData);

        return _div;

        // logo - the completed data format of a thing lol.

    }
}

class command
{
    constructor(name, summary, aliases = null, parameters = null, subcommands = null, overloads = null)
    {
        this.name = name;
        this.summary = summary;
        this.aliases = aliases;
        this.parameters = parameters;
        this.subcommands = subcommands;
        this.overloads = overloads;
    }

    read()
    {
        var _div = document.createElement('div');
        _div.className = "module-command";
        _div.innerText = this.name;
        return _div;
    }

    // build() = read the entire set information dedicated to an argument
    // list() = read the arg as a block info.

    build()
    {
        var _border = document.createElement('div');
        _border.className = "command-info-border";
        
        var _div = document.createElement('div');
        _div.className = "command-info";

        var commandSyntax = document.createElement('div');
        commandSyntax.className = "command-syntax";

        var commandName = document.createElement('span');
        commandName.className = "command-name";
        commandName.innerHTML = `<b>${this.name}</b>`;

        var commandParameterData = document.createElement('div');
        commandParameterData.className = 'command-param-data';

        if (this.parameters != null)
        {
            var commandParameters = document.createElement('span');
            commandParameters.className = "command-parameters";
            //commandParameters.innerHTML += '(';

            var argOpener = document.createElement('span');
            argOpener.innerText = '(';

            var argCloser = document.createElement('span');
            argCloser.innerText = ')';

            commandParameters.appendChild(argOpener);

            this.parameters.forEach(function(parameter)
            {
                var argInfo = parameter.build();
                var argParam = parameter.list();
                argParam.onclick = function()
                {
                    if (argInfo.style.display == 'block')
                    {
                        argInfo.style.display = 'none';
                    }
                    else
                    {
                        argInfo.style.display = 'block';
                    }
                };
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


        var commandSummary = document.createElement('div');
        commandSummary.className = "command-summary";
        commandSummary.innerText = this.summary;

        _div.appendChild(commandSyntax);

        if (this.aliases != null)
        {
            var commandAliases = document.createElement('div');
            commandAliases.className = 'command-aliases';
            //var _listedAliases = this.aliases.toString();
            //this.aliases.forEach(function() { _listedAliases += ""; });
            commandAliases.innerText = `--${this.aliases.toString()}`;

            _div.appendChild(commandAliases);
        }

        _div.appendChild(commandSummary);
    
        _border.appendChild(_div);
        return _border;
    }
}

//
class parameter
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
        var argInfo = document.createElement('div');
        argInfo.className = 'parameter-info';

        var argName = document.createElement('div');
        argName.className = 'parameter-name';
        argName.innerText = this.read();
        
        var argType = document.createElement('div');
        argType.className = 'parameter-type';
        argType.innerText = this.type;

        var argTypeBubble = document.createElement('span');
        argTypeBubble.className = 'parameter-type-bubble';

        // use this upon the bubble being clicked
        //https://docs.microsoft.com/en-us/dotnet/api/system.string

        argInfo.appendChild(argName);
        argInfo.appendChild(argTypeBubble);
        argInfo.appendChild(argType);
        
        if (this.summary != null)
        {
            var argSummary = document.createElement('div');
            argSummary.className = 'parameter-summary';
            argSummary.innerText = this.summary;

            argInfo.appendChild(argSummary);
        }

        return argInfo;
    }

    list()
    {
        var parameterInfo = document.createElement('span');
        parameterInfo.className = 'command-parameter';
        parameterInfo.innerText = this.read();
        return parameterInfo;
    }

    read()
    {
        var full = this.name;
        if (this.optional)
        {
            full += '?';
        }
        return full;
    }
}

var modules =
[
    new module("alpha", "used to test commands", "the full summary",
        new Array(
            new command("help", "View the complete documentation Orikivo offers.", new Array("h"),
                new Array(
                new parameter("context", "string", "search for a command using referrable context.", false)
                )
            ),
            new command("latency", "Gets the current latency Orikivo is working with.", new Array("ping")),
            new command("unload", "Unloads a module from the underlying system, preventing it from being used."),
            new command("about", "Learn about why and how Orikivo was made, alongside with some programming information.", new Array('info', 'stats'))
        )
    ),
    new module("core", "The fundamentals of Orikivo.", "The fundamentals of Orikivo. This manages and supplies a container of information.",
        new Array(
            new command("demo", "Testing how multiple modules look when organized.")
        )
    ),
    new module("demo", "A fake module.", "hey thats not fair you pranked me",
        new Array(
            new command("woah", "Testing how multiple modules look when organized.")
        )
    ),
    new module("demo2", "Another fake module.", "why is there more what in the",
        new Array(
            new command("woah2", "offers emotional support")
        )
    )
];

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
}
