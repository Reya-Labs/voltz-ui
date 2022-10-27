import { SystemStyleObject, Theme } from "@mui/system";

export const boxStyles: SystemStyleObject<Theme> = {
    display: "flex",
    borderRadius: "4px",
    padding: "4px 8px",
    marginTop: "16px",
    background: "#472043",
    marginLeft: "8px",
    width: "100px",
    justifyContent: "center",
}

export const tagStyles: SystemStyleObject<Theme> = {
    fontSize: '14px',
    color:"#FF4AA9"
};

export const titleStyles: SystemStyleObject<Theme> = { 
    fontSize: '24px', 
    lineHeight: '1.3', 
    color: '#E5E1F9',
    fontWeight: '700',
    marginLeft: "16px",
};

export const copyStyles: SystemStyleObject<Theme> = {
    fontSize: '14px',
    color: '#9B97AD', 

    marginLeft: "8px",
    marginTop: "16px",
}