import { type CookieOptions } from '@supabase/ssr';

export const setCookie = (name: string, value: string, options: CookieOptions) => {
  console.log(options);

  var expires = '';
  //   if (days) {
  //     var date = new Date();
  //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  //     expires = '; expires=' + date.toUTCString();
  //   }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};
