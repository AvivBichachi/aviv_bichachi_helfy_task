export async function getTasks(){
    const res = await fetch('/api/tasks')
    if(!res.ok) {
        throw new Error(`Failed to load tasks:${res.status}`)
    }
    return res.json()
}

export async function createTask(payload) {
    const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(payload)
    })

    if(!res.ok) {
        throw new Error(`Failed to create task: ${res.status}`)
    }
    return res.json()
}

export async function deleteTask(id) {
    const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
    })
    if(!res.ok) {
        throw new Error(`Failed to delete task: ${res.status}`)
    }
    return
}

export async function toggleTask(id) {
  const res = await fetch(`/api/tasks/${id}/toggle`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error(`Failed to toggle task: ${res.status}`);
  }

  return res.json();
}

export async function updateTask(id,payload) {
    const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload),
    })
    if(!res.ok) {
        throw new Error(`Failed to update task: ${res.status}`)
    }
    return res.json()
}