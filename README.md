# PaperModX

PaperModX is a forked version of [PaperMod](https://github.com/adityatelange/hugo-PaperMod),
it aims at adding new features and improving code quality,
makes it easier to read and modify by anyone with basic knowledge of Hugo and HTML.

Features and changes:
- Table of Contents (ToC) floating on the side
- InstantClick integration
- Social icons from [Simple Icons](https://simpleicons.org/)
- Opinionated UI enhancements

## Getting started

You can use [reorx/papermodx-example](https://github.com/reorx/papermodx-example) as a boilerplate to create a new Hugo site with PaperModX theme. For detailed instructions please see the README of papermodx-example repo.

## Table of Contents (ToC) floating on the side

By adding config:

```yaml
params:
  TocSide: 'left'  # or 'right'
```

ToC will float on the left/right side of the page.
You can take a look at how `'right'` feels like in [Installation | Update](https://reorx.github.io/hugo-PaperModX/docs/installation/).

The ToC box is responsive, it only shows on the side when minimum screen size is 1440px.

This feature is enabled on this site.


## InstantClick integration

By adding config:

```yaml
params:
  EnableInstantClick: true
```

[InstantClick](http://instantclick.io/) will be enabled,
making navigation behaves like Single Page Application.

Note that `/search` pages are omitted from InstantClick
to prevent conflicts from search's JavaScript,
this may be changed in the future after refactoring those scripts.

Another thing to notice is smooth scrolling will be disabled
if InstantClick is enabled, because they both listen click
event on every `<a>` tags. IMO smooth scrolling is not very useful
so it has to give way to InstantCllick.

This feature is enabled on this site.


## Give links an accent color.

Though PaperModX is designed to be minimal, accent color is still essential.
It's a good way to show personality and make your site feels more delightful.

The default color is a purple vibe,
you can customize the colors of link, link underline and their hover variants
by override the following css variables in `assets/css/extended/custom.css` of your site.

```css
:root {
  --link-color: var(--primary);
  --link-hover-color: #573eaa;
  --link-underline-shadow: 0 1px 0 var(--link-color);
  --link-hover-underline-color: #573eaa;
  --link-hover-underline-shadow: 0 2px 0 var(--link-hover-underline-color);
}
```


## Customize pagniator size

In section pages, if you want the paginator size be different from the
[global config](https://gohugo.io/templates/pagination/#configure-pagination),
you can add `paginate` in the frontmatter to customize.

```yaml
---
paginate: 10
---
```


## Menus external link

You can add `external: true` to a menu item's params to mark it as an external link,
this will add a small icon to the end, and make the link open in new tab when clicked.

```yaml
menu:
  main:
    - name: "@Author"
      url: "https://reorx.com"
      params:
        external: true
```


## Highlight code with Chroma, no bullshit

PaperMod uses highlight.js to highlight code blocks.
In PaperModX, we use Chroma which is the recommended way in Hugo's
[official docs](https://gohugo.io/content-management/syntax-highlighting/#:~:text=Hugo%20uses%20Chroma%20as%20its%20code%20highlighter%3B%20it%20is%20built%20in%20Go%20and%20is%20really%2C%20really%20fast),
thus changing theme is easily supported.

By default the themes are `github` for light and `dracula` for dark,
you can change it by adding `chroma-light.css` and `chroma-dark.css`
in site's `assets/css/lib` directory.


## Social icons from Simple Icons

Add social icons with `-simple` suffix from [Simple Icons](https://simpleicons.org/).

Available icons:
- github-simple
- rss-simple
- telegram-simple
- twitter-simple
- pinboard-simple

The icons are moved from `layouts/partials/svg.html` to `data/svg.toml`,
makes it easier to maintain, it's now possible to have an index page
to show all the icons, check it out at: [Icons Preview](https://reorx.github.io/hugo-PaperModX/docs/icons_preview/)


## Opinionated UI enhancements

- Distinguish home page width and post page width, post page is wider
  (800px) for better readability, you can change it by `--post-width` in `theme-vars.css`.
- Menu links are always bold, this feels more consistent when clicking around. Active links have deeper color.
