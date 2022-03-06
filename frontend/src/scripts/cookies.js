readCookie = (cname) =>
{
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(window.document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) 
    {
        let c = ca[i];
        while (c.charAt(0) == ' ') 
        {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
        return c.substring(name.length, c.length);
        }
    }
    return '';
}
createCookie=(cname, cvalue)=>
{
    let d = new Date();
    d.setTime(d.getTime() + (10*24*60*60*1000));
    let expires = 'expires='+ d.toUTCString();
    window.document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
deleteCookie = (name) =>
{
  if(readCookie(name)) 
  {
    window.document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
}