"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");
const { resolvePath, walkSync } = require("./file");

const fullPath = resolvePath("./templates");
const skips = [`${fullPath}/package.json`, `${fullPath}/project.config.json`];

module.exports = class extends Generator {
  // Note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument("appname", { type: String, required: false });

    // And you can then access it later; e.g.
    this.log(this.options.appname);
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the mathematical ${chalk.red("generator-weapp")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        required: true,
        message: "Your project name",
        default: this.appname
      },
      {
        type: "input",
        name: "description",
        required: false,
        message: "Project description",
        default: "A weapp seed project."
      },
      {
        type: "input",
        name: "version",
        required: false,
        message: "Project version",
        default: "1.0.0"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.initPackage();
    this.initProjectConfig();
    this.renderTplFile();
  }

  install() {
    this.installDependencies({
      yarn: { force: true },
      bower: false,
      npm: false
    });
  }

  initPackage() {
    let pkg = this.fs.readJSON(this.templatePath("package.json"), {});

    const { props } = this;
    pkg = _.merge(pkg, {
      name: props.name,
      description: props.description,
      version: props.version
    });

    this.fs.writeJSON(this.destinationPath("package.json"), pkg);
  }

  initProjectConfig() {
    let config = this.fs.readJSON(this.templatePath("project.config.json"), {});

    const { props } = this;
    config = _.merge(config, {
      projectname: props.name
    });

    this.fs.writeJSON(this.destinationPath("project.config.json"), config);
  }

  async renderTplFile() {
    const target = [];

    walkSync(fullPath, (path, newpath) => {
      if (!skips.includes(path)) {
        if (newpath) {
          path = path.replace(`${fullPath}/`, "");
          newpath = newpath.replace(`${fullPath}/`, "");
          target.push([path, newpath]);
        } else {
          path = path.replace(`${fullPath}/`, "");
          target.push(path);
        }
      }
    });

    _.forEach(target, file => {
      let toFile;
      let fromFile;
      if (_.isArray(file)) {
        fromFile = file[0];
        toFile = file[1];
      } else {
        fromFile = file;
        toFile = file;
      }

      this.fs.copyTpl(
        this.templatePath(fromFile),
        this.destinationPath(toFile),
        this.props
      );
    });
  }
};
