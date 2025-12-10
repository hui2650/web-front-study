async function getPosts(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  const data = await response.json();

  data.forEach((post) => {
    console.log(post.title);
  });
}

getPosts(1);

async function createPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "title",
      body: "body",
      userId: 1,
    }),
  });

  const data = await response.json();

  console.log(data);
}

createPost();

// async function deletePost(id) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${id}`,
//     {
//       method: "DELETE",
//     }
//   );

//   if (response.ok) {
//     console.log("삭제 성공");
//   } else {
//     console.log("삭제 실패");
//   }
// }
// deletePost(1);

async function updatePost(userId, newTitle) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
      }),
    }
  );

  const data = await response.json();

  console.log(data);
}

updatePost(1, "수정된 제목");

async function getTodos() {
  try {
    const response = await fetch("요청주소");

    if (!response.ok) {
      throw new Error("요청 응답 오류");
    }

    const result = await response.json();
    return result.data; // 스프링 responseDTO 구조
  } catch (error) {
    console.log("조회실패: ", error);
  }
}

async function addTodo(title) {
  try {
    const response = await fetch("요청주소", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error("추가 실패");
    }

    const result = await response.json();
    return result.data;
  } catch (err) {
    console.log("에러: ", err);
  }
}

async function deleteTodo(id) {
  try {
    const response = await fetch(`요청주소/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("삭제 실패");
    }

    const result = await response.json();
    return result.data;
  } catch (err) {
    console.log(err);
  }
}
