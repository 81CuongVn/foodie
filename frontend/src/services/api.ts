import axios from 'axios';
import { IFetchParams, IPost, IProfile, IRegister } from '~/types/types';

const foodieUrl = process.env.FOODIE_URL || 'http://localhost:9000';
const foodieApiVersion = process.env.FOODIE_API_VERSION || 'v1';
axios.defaults.baseURL = `${foodieUrl}/api/${foodieApiVersion}`;
axios.defaults.withCredentials = true;

export const login = async (email: string, password: string) => {
    try {
        const req = await axios({
            method: 'POST',
            url: '/authenticate',
            data: { email, password }
        });

        return Promise.resolve(req.data.data);
    } catch (e) {
        return Promise.reject(e.response.data);
    }
};

export const checkAuthSession = async () => {
    try {
        const req = await axios({
            method: 'GET',
            url: '/check-session',
        });

        return Promise.resolve(req.data.data);
    } catch (e) {
        return Promise.reject(e);
    }
}

export const register = async ({ email, password, username }: IRegister) => {
    try {
        const req = await axios({
            method: 'POST',
            url: '/register',
            data: {
                email,
                password,
                username
            }
        });

        return Promise.resolve(req.data.data);
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const logout = async () => {
    try {
        await axios({
            method: 'DELETE',
            url: '/logout',
        });

        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const getNewsFeed = async ({ offset = 0 }: IFetchParams) => {
    try {
        const req = await axios({
            method: 'GET',
            url: '/feed',
            params: {
                offset
            }
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const getSinglePost = async (postID: string) => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/post/${postID}`,
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const createPost = async (post: FormData) => {
    try {
        const req = await axios({
            method: 'POST',
            url: '/post',
            data: post
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}



export const getUser = async (username: string) => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/${username}`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const updateUser = async (username: string, updates: Partial<IProfile>) => {
    try {
        const req = await axios({
            method: 'PATCH',
            url: `/${username}/edit`,
            data: updates
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const getPosts = async (username: string, { offset = 0 }: IFetchParams): Promise<any> => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/${username}/posts`,
            params: {
                offset
            }
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const deletePost = async (postID: string) => {
    try {
        const req = await axios({
            method: 'DELETE',
            url: `/post/${postID}`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const updatePost = async (postID: string, updates: Partial<IPost>) => {
    try {
        const req = await axios({
            method: 'PATCH',
            url: `/post/${postID}`,
            data: updates
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const getComments = async (postID: string, { offset = 0, limit, skip, sort = 'desc' }: IFetchParams): Promise<any> => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/comment/${postID}`,
            params: {
                offset,
                limit,
                skip,
                sort
            }
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const deleteComment = async (commentID: string): Promise<any> => {
    try {
        await axios({
            method: 'DELETE',
            url: `/comment/${commentID}`,
        });

        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const commentOnPost = async (postID: string, body: string): Promise<any> => {
    try {
        const req = await axios({
            method: 'POST',
            url: `/comment/${postID}`,
            data: {
                body
            }
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const updateComment = async (postID: string, body: string): Promise<any> => {
    try {
        const req = await axios({
            method: 'PATCH',
            url: `/comment/${postID}`,
            data: {
                body
            }
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const getNotifications = async (params: IFetchParams): Promise<any> => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/notifications`,
            params: {
                offset: params.offset
            }
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const followUser = async (id: string): Promise<any> => {
    try {
        const req = await axios({
            method: 'POST',
            url: `/follow/${id}`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const unfollowUser = async (id: string): Promise<any> => {
    try {
        const req = await axios({
            method: 'POST',
            url: `/unfollow/${id}`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const getFollowers = async (username: string, { offset = 0 }: IFetchParams): Promise<any> => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/${username}/followers`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const getFollowing = async (username: string, { offset = 0 }: IFetchParams): Promise<any> => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/${username}/following`,
            params: {
                offset
            }
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const likePost = async (id: string): Promise<any> => {
    try {
        const req = await axios({
            method: 'POST',
            url: `/like/post/${id}`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const readNotification = async (id: string): Promise<any> => {
    try {
        const req = await axios({
            method: 'PATCH',
            url: `/read/notification/${id}`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const getUnreadNotifications = async (): Promise<any> => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/notifications/unread`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response?.data || {});
    }
}

export const markAllAsUnreadNotifications = async (): Promise<any> => {
    try {
        const req = await axios({
            method: 'PATCH',
            url: `/notifications/mark`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const getBookmarks = async (): Promise<any> => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/bookmarks`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const bookmarkPost = async (postID: string): Promise<any> => {
    try {
        const req = await axios({
            method: 'POST',
            url: `/bookmark/post/${postID}`
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const uploadPhoto = async (data: FormData, field: string): Promise<string> => {
    try {
        const req = await axios({
            method: 'POST',
            url: `/upload/${field}`,
            data
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const getSuggestedPeople = async (params: IFetchParams): Promise<IProfile[]> => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/people/suggested`,
            params
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}

export const search = async (params: IFetchParams): Promise<any> => {
    try {
        const req = await axios({
            method: 'GET',
            url: `/search`,
            params
        });

        return Promise.resolve(req.data.data)
    } catch (e) {
        return Promise.reject(e.response.data);
    }
}