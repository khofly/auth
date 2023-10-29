import { GlobalContext } from './CTX';
import { useContext } from 'react';

const useGlobalCtx = () => {
  const { content, tier, loadingTier, profile, loadingProfile } = useContext(GlobalContext);

  const translate = (content: string, ...args: string[]) => {
    if (args.length) {
      const formattedContent = content?.replace(/{(\d+)}/g, (match) => {
        return args[parseInt(match.substring(1, 2))];
      });

      return formattedContent || '<-- untranslated -->';
    }

    return content || '<-- untranslated -->';
  };

  return {
    content,
    translate,

    tier,
    loadingTier,
    profile,
    loadingProfile,
  };
};

export default useGlobalCtx;
