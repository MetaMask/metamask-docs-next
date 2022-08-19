# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.13]
### Uncategorized
- Fixed linting issues
- Added examples of other languages working
- Fixed import from bad location
- Fix syntax highlighting
- Fixed linting issues
- Changed how options for code block are wired up

## [0.0.12]
### Uncategorized
- Fixed type issues
- Fixed some linting errors
- Changed how the codeblock objects are constructed and used
- Fixed linting issue
- Fixed extractCodeBlocks for js and ts
- WIP GOTTA GO TO BASEBALL

## [0.0.11]
### Uncategorized
- Fixed import of TOCGroup
- Changed getStaticPaths to use getTOC instead of getPages
- Changed the selectors for css to use sass nesting
- Added markdown linting
- Added introduction content
- Added cursor pointer for details sidenav

## [0.0.10]
### Uncategorized
- Merge branch 'main' into nested-folders-smalltime
- Fixed fallback false

## [0.0.9]
### Uncategorized
- Fixed homepage in package.json
- Fixed ordering
- Added dynamic route to handle index routes
- Merge branch 'nested-folders' of github.com:MetaMask/metamask-docs-next into nested-folders
- Added pathPrefix to TOC type
- Merge branch 'main' into nested-folders
- Added active link to Sidenav
- Removed consolelogs
- Fixed linting issues
- Added sorting groups by order
- Changed how toc is built and how pages are read
- WIP nested folders

## [0.0.8]
### Uncategorized
- Merge branch 'main' of github.com:MetaMask/metamask-docs-next
- Fixed introduction to use Tip component

## [0.0.7]
### Uncategorized
- Fixed url linking issues

## [0.0.6]
### Uncategorized
- Fixed linting issue
- Fixed asset path for next

## [0.0.5]
### Uncategorized
- Update publish-release.yml

## [0.0.4]
### Uncategorized
- Fixed release to make a build

## [0.0.3]
### Uncategorized
- Fixed redirect to do it client side
- Fixed linting issues
- Fixed the routing
- Added order to frontmatter meta
- Added routing from index
- Added a bit better typing to getStaticProps
- Update CHANGELOG.md
- 0.0.2
- Update CHANGELOG.md
- 0.0.1
- Changed :::tip to Tip component and Warning
- Added Tip and Warning components
- Fixed linting
- Added console output goodies
- Fixed typing error in example
- Fixed linting issues
- Removed memfs + browserify
- Fixed code for etheruem provider md
- Removed console logs
- Added run button to eval code blocks
- Added first code block running via eval
- Removed unused console.log
- Fixed working code block modules
- Commit WEbpack shenanigans
- target esnext again
- Alot more than gray matter
- Fixed code editor heights and widths
- Added monaco for multiline code blocks
- Added parsing gray-matter
- Fixed eslint config to play nice with nextjs
- Fixed linting again
- Fixed repository
- Fixed linting
- Fixed no test script
- Changed CODEOWNERS to dev-ex team
- Fixed whitespace issue in publish-release
- Added MetaMask module template defaults
- Added MetaMask module template files
- Fixed sidebar css and remove unused code in getPages
- Remove footer content, but strucurally still have one set up (1px) as we intend to use it.
- Remove context for theme Add design-token.css manually Remove @metamask/design-tokens Update design-token css to use media query for theme
- Fix error in layout
- Update layout to use one text variable for title Add user select none to sidenav
- update layout with route name
- Add subroute to title, horrible code, just trying to get something started.
- Changes to styles around sidenav
- Removed unused nextjs config + convert appcontext to ts
- Removed unused code in index page
- remove footer text
- Add context to track theme. Had issues writing context as in TS, left it as JS.
- Fixed Sidebar to be links
- Added mdx via next-mdx-remote
- Swap my light and dark theme definitions out with variables from MetaMask design-tokens
- Rmeove import of MetaMask design-tokens from global, import from index instead.
- Add MetaMask/design-tokens CSS
- Organize css into modules directory Import from index.scss
- Add light and dark theme colors back
- Add semis
- Remove sidenav from layout Add styles back to home, trying ourt Next style modules. ? . ?
- Inside `[guide].tsx` we want a div to control two divs with flexbox.
- Update background colors to match metamask.io and reduce contrast on navigation seperator
- Add SCSS, topnav, sidenav, footer, and flexbox layout to take up full screen.
- Clean up _app.tsx and other components, add a few markdwon files with matter and resolve key error in sidebar.
- feat: first
- Initial commit from Create Next App

## [0.0.2]
### Added
- Update CHANGELOG.md
- Changed :::tip to Tip component and Warning
- Added Tip and Warning components
- Fixed linting
- Added console output goodies
- Fixed typing error in example
- Fixed linting issues
- Removed memfs + browserify
- Fixed code for etheruem provider md
- Removed console logs
- Added run button to eval code blocks
- Added first code block running via eval
- Removed unused console.log
- Fixed working code block modules
- Commit WEbpack shenanigans
- target esnext again
- Alot more than gray matter
- Fixed code editor heights and widths
- Added monaco for multiline code blocks
- Added parsing gray-matter
- Fixed eslint config to play nice with nextjs
- Fixed linting again
- Fixed repository
- Fixed linting
- Fixed no test script
- Changed CODEOWNERS to dev-ex team
- Fixed whitespace issue in publish-release
- Added MetaMask module template defaults
- Added MetaMask module template files
- Fixed sidebar css and remove unused code in getPages
- Remove footer content, but strucurally still have one set up (1px) as we intend to use it.
- Remove context for theme Add design-token.css manually Remove @metamask/design-tokens Update design-token css to use media query for theme
- Fix error in layout
- Update layout to use one text variable for title Add user select none to sidenav
- update layout with route name
- Add subroute to title, horrible code, just trying to get something started.
- Changes to styles around sidenav
- Removed unused nextjs config + convert appcontext to ts
- Removed unused code in index page
- remove footer text
- Add context to track theme. Had issues writing context as in TS, left it as JS.
- Fixed Sidebar to be links
- Added mdx via next-mdx-remote
- Swap my light and dark theme definitions out with variables from MetaMask design-tokens
- Rmeove import of MetaMask design-tokens from global, import from index instead.
- Add MetaMask/design-tokens CSS
- Organize css into modules directory Import from index.scss
- Add light and dark theme colors back
- Add semis
- Remove sidenav from layout Add styles back to home, trying ourt Next style modules. ? . ?
- Inside `[guide].tsx` we want a div to control two divs with flexbox.
- Update background colors to match metamask.io and reduce contrast on navigation seperator
- Add SCSS, topnav, sidenav, footer, and flexbox layout to take up full screen.
- Clean up _app.tsx and other components, add a few markdwon files with matter and resolve key error in sidebar.
- feat: first
- Initial commit from Create Next App

## [0.0.1]
### Added
- Tip and Warning components
- Run examples live in-page
- Initial bootstrapping code for nextjs and mdx

[Unreleased]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.13...HEAD
[0.0.13]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/MetaMask/metamask-docs-next/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/MetaMask/metamask-docs-next/releases/tag/v0.0.1
