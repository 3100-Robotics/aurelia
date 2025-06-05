## Developer notes
0. Make sure you have all dependencies installed. You do not need android studio unless you plan on working on the android side of development. We recommend NVM on windows
1. Run `npm install` after cloning the project
2. className={'border border-input bg-background shadow-sm inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'}



## Schema for hosting your own config
```
root
├── config_a.json
├── config_b.json
│
└── style
    ├── index.css
    ├── team_logo.svg
    ├── team_banner.svg
    ├── coral.svg
    ├── note.svg
    └── algae.svg
```
The only required file is at least one config