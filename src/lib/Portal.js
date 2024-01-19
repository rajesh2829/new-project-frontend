export function setPortalName(name) {
    let portalName = document.getElementById("portalName");
    if (name) {
      portalName.innerHTML = name;
    }
  }
  
  /**
   * Set Portal Favicon
   * @param list
   */
  export function setPortalFavicon(icon) {
    const favIcon = document.getElementById("portalFavIcon");
  
    if (icon && favIcon.href !== icon) {
      favIcon.href = icon;
    }
  }