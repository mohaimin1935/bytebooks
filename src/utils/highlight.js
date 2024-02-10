const getHighlighted = (text, startIndex, endIndex) => {
    
    let st = [];
    let front, end;
    front = end = -1;
    let res = "";
    for (let i=0;i<text.length;i++) {

        if (text[i]==='<') {
            front = i;
        }
        else if (front!=-1 && text[i]==='>') {
            end = i;
        }
        if (i==startIndex) {
            for (let j=0;j<st.length;j++) {
                res += st[j];
            }
        }
        else if (i==endIndex) {
            res += text.substring(startIndex,endIndex+1);
            
            for (let j=st.length-1;j>=0;j--) {
                res += "</" + st[j].substring(1);
            }
            
            break;
        }
        if (front!=-1 && end!=-1) {

            let tag = text.substring(front,end+1);
            
            if (tag[1]==='/') {
                st.pop();
                // assumed that tags nest properly
            }
            else {
                st.push(tag);
            }
            
            front = end = -1;
        }
    }
    
    return res;
};

const getHighlightedIndex = (text, highlightedText) => {
    
    let withoutTag = "";
    let withoutTagIndex = [];
    let inTag = false;
    for (let i=0;i<text.length;i++) {
        if (text[i]==='<') {
            inTag = true;
        }
        else if (text[i]==='>') {
            inTag = false;
        }
        else if (!inTag) {
            withoutTag += text[i];
            withoutTagIndex.push(i);
        }
    }
    
    let start = withoutTag.indexOf(highlightedText);
    if (start!=-1) {
        let end = start + highlightedText.length - 1;
        return [withoutTagIndex[start],withoutTagIndex[end]];
    }
    console.log("highlighted text not matched");
    return [-1,-1];
};


// let a = "<p> hello world <b> hell wows<u>ls </u>fka </b><u> afjaf </u> <i> af<b>jak</b> </i> </p>";

// console.log("ori: " + a);
// console.log("wan: "+a.substring(15,55+1));
// let b = getHighlighted(a, 15, 55);

// console.log("con: "+b);
// let c;
// console.log(c = getHighlightedIndex(a, "hello wor"));
// console.log("/"+a.substring(c[0],c[1]+1)+"/");