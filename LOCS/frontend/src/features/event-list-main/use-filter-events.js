import { useSelector } from "react-redux"
import { selectedTagsSelectors } from "~/redux/common-slices/selected-tags-slice"

export const useFilterEvents = (events) => {
    const selectedTags = useSelector(selectedTagsSelectors.selectedTagsIdSelector);

    if(!events) return null;
    if(selectedTags.length === 0) return events;

    return events.filter(
        event => selectedTags.every(
            tag => event.tags.includes(tag)
        )
    );
}