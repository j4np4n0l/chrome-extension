// content.js

function extractSEOMetadata() {
  const title = document.title || "No title found";
  const description = getMetaContent('meta[name="description"]') || "No description found";
  const keywords = getMetaContent('meta[name="keywords"]') || "No keywords found";
  const social = getMetaContent('meta[property="og:title"]') || "No social tagline added";
  const primaryKeyword = document.querySelector('.wpseo-focus-keyword');
  const pkw = primaryKeyword ? primaryKeyword.textContent : 'No main keyword found';
  const heading1 = document.querySelectorAll('h1');
  const url = window.location.href;
  const typePost = document.querySelector('.type-post');

  let category = 'No category detected';
  let tags = 'No tags detected';

  if (typePost) {
    const getClassAttribute = typePost.getAttribute('class');
    const classNamesArray = getClassAttribute.split(' ');
    const findCategory = findClassWithPrefix(classNamesArray, 'category-');
    const filterTags = filterClassesWithPrefix(classNamesArray, 'tag-');

    category = findCategory ? findCategory.substring('category-'.length) : category;
    tags = filterTags.length > 0 ? filterTags.map(tagClass => tagClass.substring('tag-'.length)).join(', ') : tags;
  }

  const h1 = getHeadingsContent(heading1);

  return {
    title,
    description,
    pkw,
    keywords,
    h1,
    url,
    social,
    category,
    tags,
  };
}

// Send SEO metadata to the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSEO") {
    sendResponse({ seoMetadata: extractSEOMetadata() });
  }
});

function getMetaContent(selector) {
  const metaElement = document.querySelector(selector);
  return metaElement?.content;
}

function findClassWithPrefix(classNamesArray, prefix) {
  return classNamesArray.find(className => className.startsWith(prefix));
}

function filterClassesWithPrefix(classNamesArray, prefix) {
  return classNamesArray.filter(className => className.startsWith(prefix));
}

function getHeadingsContent(headingElements) {
  if (!headingElements || headingElements.length === 0) {
    return '';
  }

  const headingsContent = Array.from(headingElements).map(heading => heading.innerText);
  return headingsContent.join('<br>');
}
