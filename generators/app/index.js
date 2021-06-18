"use strict";
const Generator = require("yeoman-generator");
// eslint-disable-next-line no-unused-vars
const install = require("yeoman-generator/lib/actions/install");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");

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

  renderTplFile() {
    let target = [
      ["_editorconfig", ".editorconfig"],
      ["_eslintignore", ".eslintignore"],
      ["_eslintrc.js", ".eslintrc.js"],
      ["_gitignore", ".gitignore"],
      ["_stylelintignore", ".stylelintignore"],
      ["_stylelintrc.js", ".stylelintrc.js"],
      "app.js",
      "app.json",
      "app.wxss",
      "sitemap.json",
      "README.md",
      "api/user.js",
      "assets/images/splash/logo@2x.png",
      "assets/styles/.gitkeep",
      "components/.gitkeep",
      "lib/eventemitter2.js",
      "moudles/log/api/.gitkeep",
      "moudles/log/assets/images/.gitkeep",
      "moudles/log/assets/styles/.gitkeep",
      "moudles/log/pages/index/index.js",
      "moudles/log/pages/index/index.json",
      "moudles/log/pages/index/index.wxml",
      "moudles/log/pages/index/index.wxss",
      "moudles/log/store/.gitkeep",
      "packages/webview/api/.gitkeep",
      "packages/webview/assets/images/.gitkeep",
      "packages/webview/assets/styles/.gitkeep",
      "packages/webview/pages/index/index.js",
      "packages/webview/pages/index/index.json",
      "packages/webview/pages/index/index.wxml",
      "packages/webview/pages/index/index.wxss",
      "packages/webview/store/.gitkeep",
      "pages/splash/index.js",
      "pages/splash/index.json",
      "pages/splash/index.wxml",
      "pages/splash/index.wxss",
      "store/user.js",
      "utils/httpclient/cookie.js",
      "utils/httpclient/index.js",
      "utils/httpclient/request.js",
      "utils/common.js",
      "utils/emitter.js",
      "utils/env.js",
      "utils/error.js",
      "utils/format.js",
      "utils/sleep.js",
      "utils/update.js",
      "utils/wxp.js"
    ];

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
