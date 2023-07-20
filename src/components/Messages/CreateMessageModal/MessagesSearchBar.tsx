import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../state/hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { SelectedUser } from "../../../state/slices/messagesSlice";

const styles = {
  autocomplete: { "&.MuiAutocomplete-input": { paddingLeft: 0 } },
  box: {
    padding: 1,
  },
  displayName: {
    fontWeight: "bold",
  },
  searchIcon: { paddingRight: 0 },
};

type SearchBarProps = {
  placeholder: string;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onSelect: (state: SelectedUser) => void;
};

const SearchBarMessages = ({
  placeholder,
  onSearchFocus,
  onSearchBlur,
  onSelect,
}: SearchBarProps) => {
  const user = useAppSelector((state) => state.user);
  const [followedList, setFollowedList] = useState<SelectedUser[]>([]);
  useEffect(() => {
    const fetchDMList = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/messages/followedList",
        {
          params: {
            userId: user.userId,
          },
        }
      );
      setFollowedList(result.data as SelectedUser[]);
    };
    fetchDMList();
  }, [user]);

  return (
    <Box sx={styles.box}>
      <Autocomplete
        fullWidth
        getOptionLabel={(option) => `${option.displayName} @${option.username}`}
        id="messages-search"
        popupIcon={false}
        onOpen={onSearchFocus}
        onClose={onSearchBlur}
        options={followedList}
        openOnFocus
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              fullWidth
              hiddenLabel
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton disabled sx={styles.searchIcon}>
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder={placeholder}
              size="small"
            />
          );
        }}
        renderOption={(_, option) => {
          return (
            <ListItemButton
              key={option.userId}
              component="li"
              onClick={() => onSelect(option)}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Box>
                    <Typography sx={styles.displayName} variant="body2">
                      {option.displayName}
                    </Typography>
                    <Typography variant="body2">{`@${option.username}`}</Typography>
                  </Box>
                }
              />
            </ListItemButton>
          );
        }}
        sx={styles.autocomplete}
      />
    </Box>
  );
};

export default SearchBarMessages;
